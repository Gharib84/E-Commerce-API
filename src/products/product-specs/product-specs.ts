import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({
    name: 'isProductSpecs',
    async: false
})
export class ProductSpecs implements ValidatorConstraintInterface {
    accepetedSpecs = ['ram', 'processor', 'ssd', 'hdd', 'brand', 'model',
        'color', 'weight', 'dimensions', 'material',
        'capacity', 'power', 'voltage', 'warranty',
        'condition', 'chip', 'year', 'other_features'];

/**
 * Validates the given specs object.
 * Ensures that all keys in the specs are part of the accepted specifications
 * and their corresponding values are non-empty strings.
 * 
 * @param specs - A record of specifications where keys are spec names and values are descriptions.
 * @returns True if all keys are accepted specs and values are non-empty, false otherwise.
 */

    validate(specs: Record<string, string>) {
        const keys = Object.keys(specs);

        if (keys.length === 0) {
            return false;
        }
        return keys.every(key => this.accepetedSpecs.includes(key) && specs[key].trim() !== '');
    }

    /**
     * Default error message if the validation fails.
     * @returns string
     */
    defaultMessage() {
        return 'Product specs must be avalid object with supported specs';
    }
}
