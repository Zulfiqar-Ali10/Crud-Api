import express from "express";
const router = express.Router();
import Banner from "../models/Banner.js";
import sendResponse from "../helpers/sendResponse.js";

router.post("/", async (req, res) => {
    const { heading, paragraphy } = req.body;

    try {
        let newBanner = new Banner({ heading, paragraphy });
        newBanner = await newBanner.save();
        sendResponse(res, 201, newBanner, false, "Banner Added Successfully");
    } catch (error) {
        sendResponse(res, 500, null, true, "Failed to add banner");
    }
});

router.get("/", async (req, res) => {
    try {
        let banners = await Banner.find();
        sendResponse(res, 200, banners, false, "Banners fetched successfully");
    } catch (error) {
        sendResponse(res, 500, null, true, "Failed to fetch banners");
    }
});


router.get("/:id", async (req, res) => {
    try {
        const banners = await Banner.findById(req.params.id);

        if (!banners) {
            return sendResponse(res, 404, null, true, "Banner not found");
        }

        sendResponse(res, 200, banners, false, "Banner fetched successfully");
    } catch (error) {
        sendResponse(res, 500, null, true, "Failed to fetch banner");
    }
});


router.put("/:id", async (req, res) => {
    const { heading, paragraphy } = req.body;
    try {
        const banners = await Banner.findById(req.params.id);

        if (!banners) {
            return sendResponse(res, 404, null, true, "Banner not found");
        }

        if(heading) banners.heading = heading;
        if(paragraphy) banners.paragraphy = paragraphy;
        await banners.save();
        sendResponse(res, 200, banners, false, "Banner Updated successfully");
    } catch (error) {
        sendResponse(res, 500, null, true, "Failed to fetch banner");
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const banners = await Banner.findById(req.params.id);

        if (!banners) {
            return sendResponse(res, 404, null, true, "Banner not found");
        }

        await banners.deleteOne({_id: req.params.id});
        sendResponse(res, 200, null, false, "Banner Delete successfully");
    } catch (error) {
        sendResponse(res, 500, null, true, "Failed to fetch banner");
    }
});

export default router;