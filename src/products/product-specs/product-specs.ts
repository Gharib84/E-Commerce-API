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

    validate(specs: Record<string, string>) {
        const keys = Object.keys(specs);

        if (keys.length === 0) {
            return false;
        }
        return keys.every(key => this.accepetedSpecs.includes(key) && specs[key].trim() !== '');
    }

    defaultMessage() {
        return 'Product specs must be avalid object with supported specs';
    }
}
