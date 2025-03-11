import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';

@ValidatorConstraint({ name: 'ProductDescription', async: true })
export class ProductDescription implements ValidatorConstraintInterface {
    message: string;

    async validate(description: string) {
        dotenv.config();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error('Missing API key');
        }
        const genAi = new GoogleGenerativeAI(apiKey);
        const model = genAi.getGenerativeModel({
            model: 'gemini-1.5-pro',
        })
        const prompt = `Given the description provided below,
                        please check if it means something to a user perspective and
                        make sure that it doesn't contain any offensive content or
                        vague informations
                        \\n \\n the description: "${description}"
                        \\n \\n if you think the description is
                        valid, please return "valid" otherwise type "invalid"
                        \\n \\n + the reason why you think it's invalid
                        \\n the response should be sent in a human-readable
                        format, since it will be used to send feedback to the
                        client`;
        const result = await model.generateContent(prompt);
        const response = result.response
        const isValid = !response.text().toLowerCase().includes('invalid');
        if(!isValid) this.message = response.text();

        return isValid;
    }

    defaultMessage() {
        return 'Description should not be empty';
    }
}
