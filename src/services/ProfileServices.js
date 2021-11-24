import * as ProfileRepository from "../repositories/ProfileRepository.js";
import resFormat from "../utils/resFormat.js";

export const Create = async(req, res, next) => {
    try{
        const exProfile = await ProfileRepository.fineByUserId(
            parseInt(req.user.id, 10)
        );

        if (exProfile[0]) {
            return res
                .status(403)
                .send(resFormat.fail(403, "이미 프로필이 존재합니다."));
        }

        //유저 아이디로 프로필 생성
        const response = await ProfileRepository.createProfile(
            MakeOption(req.user.id,req.body)
        );

        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "프로필 생성 실패"));
        }

        const ProfileData = await ProfileRepository.findById(response.id);

        return res.status(200).send(
            resFormat.successData(200, "프로필 생성 성공", ProfileData)
        );
    }
    catch(err){
        next(err);
    }
}
export const Get = async(req,res,next) => {
    try{
        const exProfile = await ProfileRepository.fineByUserId(
            parseInt(req.params.id, 10)
        );

        if (!exProfile) {
            return res
                .status(403)
                .send(resFormat.fail(403, "이미 프로필이 존재하지 않습니다."));
        }
        
        const ProfileData = await ProfileRepository.findById(parseInt(req.params.id,10));
        
        return res.status(200).send(
            resFormat.successData(200, "프로필 가져오기 성공!", ProfileData)
        );

    }
    catch(err){
        next(err);
    }
}
const MakeOption = (userId,bodydata) => {
    // DB data 옵션 설정.
    const dataOption = {
        userId: parseInt(userId, 10),
        introduce: bodydata.introduce,
        blogUrl : bodydata.blogUrl ? bodydata.blogUrl:undefined,
        githubUrl : bodydata.githubUrl ? bodydata.githubUrl:undefined,
        image : bodydata.image ? bodydata.image:undefined
    };

    return dataOption;
};