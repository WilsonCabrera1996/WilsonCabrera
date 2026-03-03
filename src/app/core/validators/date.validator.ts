import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export class DateValidators {
    static minDate(control: AbstractControl): ValidationErrors | null{
        if(!control.value) return null;
        const selectedDate = new Date(control.value + 'T00:00:00');
        const today = new Date();
        today.setHours(0,0,0,0);
        selectedDate.setHours(0,0,0,0);
        return selectedDate >= today ? null : {dateInPast:  true};

    }
    
    static oneYearAfter(releaseControlName: string): ValidatorFn{
        return (control: AbstractControl): ValidationErrors | null =>{
            const formGroup = control.parent;
            if(!formGroup) return null;
            const releaseControl = formGroup.get(releaseControlName);
            const releaseDateValue = releaseControl?.value;
            const revisionDateValue = control.value;

            if(!releaseDateValue  || !revisionDateValue) return null;
            const releaseDate = new Date(releaseDateValue + 'T00:00:00');
            const revisionDate = new Date(revisionDateValue + 'T00:00:00');
            const expectedDate = new Date(releaseDate);
            expectedDate.setFullYear(expectedDate.getFullYear() + 1);
            expectedDate.setHours(0,0,0,0);
            revisionDate.setHours(0,0,0,0);
            return expectedDate.getTime() === revisionDate.getTime()
            ? null
            :{invalidRevisionDate: true}
        }
    }
}

export const dateValidator = DateValidators.minDate;
export const oneYearAfterValidator = DateValidators.oneYearAfter;

