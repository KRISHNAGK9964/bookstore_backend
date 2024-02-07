import User from "../models/user.js";


export const getUserByUsername = async ( username) => {
    try{
        const user = await User.findOne({username});
        return user;
    }catch(error){
        console.log(`Error fetching a user : \n${error}`);
        throw error;
    }
}

export const createUser = async (user) => {
    try {
        return await User.create(user);
    } catch (error) {
        console.log(`Error in creating user \n${error}`);
        throw error;
    }
}