import mongoose from "mongoose";
const { Schema } = mongoose;

const bannerSchema = new Schema(
    {
        heading: {
            type: String,
            required: true,
        },
        paragraphy: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Banner = mongoose.model("Banner", bannerSchema);
export default Banner;
