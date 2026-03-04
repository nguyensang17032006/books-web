import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true,
            trim: true
        },
        publishedDate: {
            type: Date,
            required: true
        },
        categories: {
            type: [String],
            default: []
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        inStock: {
            type: Boolean,
            default: false
        },
        quantity: {
            type: Number,
            default: 0,
            min: 0
        },
        ImageUrl: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);
bookSchema.pre("save", function () {
    this.inStock = this.quantity > 0;
});
bookSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();

    if (update.quantity !== undefined) {
        update.inStock = update.quantity > 0;
    }

    next();
});

export default mongoose.model("Book", bookSchema);