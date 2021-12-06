import axios from "axios";
import cheerio from "cheerio";

export const fetching = async (noticenum) => {
    try {
        let $href = [];
        let noticeContents = "";
        await axios.get(`https://www.seoultech.ac.kr/service/info/notice/${noticenum}`)
            .then(dataa=>{
                const $ = cheerio.load(dataa.data);
                $('sub>wrap_title>tbl_list>body_tr').each((index, item)=>{$href.push(item.attribs.href)});

                function contentLoad(URL){
                    return new Promise((resolve, reject)=>{
                        axios.get(`https://www.seoultech.ac.kr/service/info/notice/${URL}`)
                            .then(res=>{
                                const $ = cheerio.load(res.data);
                                noticeContents += `<div style="border: 1px solid black;padding: 0 10px;">${$.html($('section#page_content'))}</div><br>`;
                            })
                            .then(()=>{
                                resolve();
                            });
                    })
                }

                return (async ()=>{
                    for(let i = 0; i<$href.length; i++){
                        await contentLoad($href[i]);
                    }
                    return Promise.resolve(noticeContents);
                })();

            })
    } catch (err) {
        console.error(err);
    }

}