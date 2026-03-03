import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { ProductService } from "../services/product.service";
import { map, catchError, of } from "rxjs";

export function IdExistsValidator(productService: ProductService): AsyncValidatorFn {
    return (control: AbstractControl) => {
        if (!control.value) return of(null);
        return productService.verifyIDExists(control.value).pipe(
            map((exists) => (exists ? {IdExists: true} : null)),
            catchError(() => of(null))
        )
    };
}
