import RefreshToken from "../../models/refesh-token.model.js";

export const logout = async (userId, tokenId) => {
    await RefreshToken.deleteOne({userId, tokenId})
}