import { response } from "express"

export const geminiInternal = (data: any) => {
    return {
        response: data.candidates[0].content.parts[0].text,
    };
};