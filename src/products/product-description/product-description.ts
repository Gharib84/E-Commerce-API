import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';

@ValidatorConstraint({ name: 'ProductDescription', async: true })
export class ProductDescription implements ValidatorConstraintInterface {
    message: string = '';
    /**
     * Validates the provided product description using the Google Generative AI service.
     * Ensures the description is user-friendly, non-offensive, and clear.
     *
     * @param description - The product description to be validated.
     * @returns A promise that resolves to a boolean indicating the validity of the description.
     *          Sets the `message` property with feedback from the AI model if the description is invalid.
     * @throws An error if the API key for the Google Generative AI is unavailable.
     */

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
        const prompt = `Given the description provided below, check if it means something to a user perspective and that it doesn't contain any offensive content or vague informations 
        \n \n the description: "${description}"
        \n if you think the description is valid, please return "valid" otherwise type "invalid" + the reason why you think it's invalid
        \n the response should be sent in a human-readable format, since it will be used to send feedback to the client`;
        const result = await model.generateContent(prompt);
        const response = result.response
        const isValid = !response.text().toLowerCase().includes('invalid');
        if (!isValid) this.message = response.text();

        return isValid;
    }

    defaultMessage() {
        return this.message
    }
}
