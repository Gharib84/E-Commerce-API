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
        
    validate(value: any) {
        return value && Object.keys(value).length > 0;
    }

    defaultMessage() {
        return 'Product specs must not be empty';
    }
}
