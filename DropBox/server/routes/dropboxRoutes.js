import express from "express";
import multer from "multer";
import { Dropbox } from "dropbox";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
const dbx = new Dropbox({ accessToken: "sl.u.AGCe8VycLXbEsFxbGpg431TyCSRYD7q05NbEPT9S3Z18XPejFKy8r-BesIPryBy-r5Svn4m6C8W38TncptacQpLQJ6_Qm1tc12Jv8EdREQ8dxwL4H3_vYtC7H1X7Bhobzs7spH3ssgmXgrN-1uu9RUQYEZZzJNXrMJsot0xx4mz0ok8QMsxnHPTTsvS3cLepi6bZynvhYTuIqG-vRgmVdAoTeI5OMlLeU2wmRQwzn39nly9ugUKcdpqfUiiUwIVyFfEMbNA7Uiox-SJwlZlng9VakpTjj8HoUaCeBADN7nhwIOaB3KjAVFuCycCyxtFRHgjXCR2Qj0TZjonQXkhAUH9tbO_tullp_LtxGnh3vdYM7xQ97YoB4vzaXicN8FZkYqGbk70oml9AbUu3mJKRm6Bi05kf69HMkHxdyttDU1nwG6f2yUHnCJoWi8gcqTWVKT6j7-vgD3QfIkTPZ-M_39pmvyrQb_G2zn-pYh6vDcrsDVyrpiui2dWioqjMAj2y7tNLMZm3hEDe-W4jClxmgPjYqlvJyzahYHvKBAyIlSX_OsCBJfmSW1Qn2wCFZLEnOpInMoudZAzp3owppcyj0aQhn5W8qtCM1ODHxtyKdqRmcuGTPDdhAooU03MPdBL6kMhKOwvg6SfeZuXreEdxyIyKnvSPIsnIZdWWcnDhG9R9gixWQoKiTerkXrdVyoILUIxq-a-m6oNsthY8ahYJqptwkIGgNj5E0LRInPzEhFHr_lRuCY5LgrYhflTgsd3GPGhpBhly0IakMU_Qa12Sq20K9PidlQiT_8RUfg5N_kt-l-C_wGDXqMis1F6PmgahI9jzbYNkWydHWYj0ZtQ6on4HITvItQ4yZeMQjrPDTnWyk3R6QAgp1_JrAdz8sN5wHRe6RXIn6hK1vA69AVDZMxRrow3gzj_RbgLyEJf_6mOoq0Xm5YDD8_aRllKPVyV7WON-HLa_iN5AjAwWh9qf2FJQGDBUooO7ObM_7Qwc2iII8quzVXbLKerF32Ge04rTHCOX0aKgGKnUXHqr4MLGmxMAQm9mLlEy3ngx_HvcKemCEzMlYWLdYFrxDMhwKlZjQ6RPq0JGvADIH7guZ7HlYwMK09g_lcQbFmYpuHRQzCyvSmQLkpewAd6FwAq8efbJEfbQ3OpBnuRHJAggZa_FP99x0JUGDSFYol8JZq-0VimRkNv_vuahiy_YHa9Hb1Be7CX9ISZrpwY5lvBZzqP9Gk8mi2xZ7uJiTKx-i69Jji3zLIc0J-kIpOIBFKaTKVbJ3fgCOSZauYNnKUo8FvDqycXiyYqedVyTb5E5ctVOfcJc989Q1QBnUycdm0Yn1VGEUJVsqS6QIignr9O1owjsoYnUxjv2Y9xTF-eTpFRPY-OIz1A_bthbxMUnJPWvVIrOn5LjQJBxi9UpOoIY6bKwXf6p5HZtCCNvy0YZuD_goZ6gug" });
console.log(process.env.DROPBOX_ACCESS_TOKEN)

// ✅ Upload file to Dropbox
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = fs.readFileSync(req.file.path);
    await dbx.filesUpload({
      path: "/" + req.file.originalname,
      contents: file,
      mode: "overwrite",
    });
    fs.unlinkSync(req.file.path);
    res.json({ message: "File uploaded to Dropbox successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// ✅ List all files in Dropbox
router.get("/list", async (req, res) => {
  try {
    const response = await dbx.filesListFolder({ path: "" });
    const files = response.result.entries.map((file) => file.name);
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to list files" });
  }
});

// ✅ Download file from Dropbox
router.get("/download/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const response = await dbx.filesDownload({ path: "/" + filename });

    fs.writeFileSync(filename, response.result.fileBinary, "binary");
    res.download(filename, () => fs.unlinkSync(filename));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Download failed" });
  }
});

export default router;
