const express = require('express');
const fs = require('fs');
const path = require('path');
const compression = require('compression');
const status=require("express-status-monitor")

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.static(path.join(__dirname, 'videos')));
app.use(compression());
app.use(status())

const videoPath = 'videos/Big Buck Bunny.mp4';


app.get('/video', (req, res) => {
    const range = req.headers.range;
    const fileSize = fs.statSync(videoPath).size;
    
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = (end - start) + 1;
        
        // Set headers
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, headers);
        
        // Create readable stream from video file
        const fileStream = fs.createReadStream(videoPath, { start, end });
        
        // Stream chunks to response
        fileStream.pipe(res);
    } else {
        // No range header provided
        const headers = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, headers);
        
        // Create readable stream from video file
        const fileStream = fs.createReadStream(videoPath);
        
        // Stream entire file to response
        fileStream.pipe(res);
    }
});



// Route for serving video as a buffer
app.get('/non-streaming-video', (req, res) => {
//   res.writeHead(200, {
//     'Content-Length': videoBuffer.length,
//     'Content-Type': 'video/mp4',
//   });
  const videoBuffer = fs.readFileSync("videos/Big Buck Bunny.mp4",(err,data)=>{
    res.end(data)
  });
  res.end(videoBuffer);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
