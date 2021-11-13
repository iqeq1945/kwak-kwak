import express from "express";
import loading from "./fetching.js";

const app = express();
const ssrData = {};

app.get('/notice', (req, res, err) => {
    const noticenum = req.query.id;
    res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
    res.write(`<html><head><title>학사공지 RSS</title></head><body><div style="width: 700px;margin: 0 auto;">` );
    if (!ssrData[noticenum]) {
        console.log('making ssr rendering');
        loading(noticenum)
            .then(noticeContents=>{
                ssrData[noticenum] = noticeContents;
                res.write(ssrData[noticenum]);
                res.write('</div></body></html>');
                res.end();
            })
            .catch(()=>{
                res.write('<h1>404 ERROR</h1>');
                res.write('</div></body></html>');
                res.end();
            })
    } else {
        res.write(ssrData[noticenum]);
        res.write('</div></body></html>');
        res.end();
    }

});

app.listen(3060, () => {
    console.log('listening from 3060')
});