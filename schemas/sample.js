import * as yup from 'yup';

export const sampleValidationSchema = yup.object().shape({
    sample_Number: yup
    .string()
    .required('Sample Number is required')
    .min(1, 'Sample Number must be at least 1 characters')
    .max(50, 'Sample Number must be at most 50 characters'),
    
    sample_Type_Id: yup
    .number()
    .nullable(),
    
    material_Id: yup
    .number()
    .nullable(),
    
    test_Specimen_Type_Id: yup
    .number()
    .nullable(),

    dimentions: yup
    .string()
    .matches(/^\d+(\.\d+)?(?:x\d+(\.\d+)?){2,3}$/, 'Dimentions must be in format "NxNxN" or "NxNxNxN"')
    .max(100, 'Dimentions must be at most 100 characters')
    .nullable(),
    
    observations: yup
    .string()
    .max(500, 'Observations must be at most 500 characters')
    .nullable(),
});
