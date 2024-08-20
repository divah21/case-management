import { useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define the interface for the form data
interface CaseFormData {
  uz_cr_ref: string;
  uz_rrb_ref: string;
  police_ref: string;
  date_received: string;
  time_received: string;
  complainant_name: string;
  complainant_dept: string;
  complainant_gender: string;
  complainant_address: string;
  complainant_contact: string;
  accused_name: string;
  accused_dept: string;
  accused_gender: string;
  accused_address: string;
  accused_contact: string;
  offence: string;
  date_occurance: string;
  place_of_occurance: string;
  mod_operandi: string;
  property_list: string;
  value_stolen: string;
  value_recorded: string;
  exhibit_book_ref: string;
  investigation_officer: string;
}

// Define validation schema using Zod
const CaseFormValidation = z.object({
  uz_cr_ref: z.string().nonempty({ message: "UZ CR Ref is required" }),
  uz_rrb_ref: z.string().nonempty({ message: "UZ RRB Ref is required" }),
  police_ref: z.string().nonempty({ message: "Police Ref is required" }),
  date_received: z.string().nonempty({ message: "Date received is required" }),
  time_received: z.string().nonempty({ message: "Time received is required" }),
  complainant_name: z.string().nonempty({ message: "Complainant name is required" }),
  complainant_dept: z.string().nonempty({ message: "Complainant department is required" }),
  complainant_gender: z.string().nonempty({ message: "Complainant gender is required" }),
  complainant_address: z.string().nonempty({ message: "Complainant address is required" }),
  complainant_contact: z.string().nonempty({ message: "Complainant contact is required" }),
  accused_name: z.string().nonempty({ message: "Accused name is required" }),
  accused_dept: z.string().nonempty({ message: "Accused department is required" }),
  accused_gender: z.string().nonempty({ message: "Accused gender is required" }),
  accused_address: z.string().nonempty({ message: "Accused address is required" }),
  accused_contact: z.string().nonempty({ message: "Accused contact is required" }),
  offence: z.string().nonempty({ message: "Offence is required" }),
  date_occurance: z.string().nonempty({ message: "Date of occurrence is required" }),
  place_of_occurance: z.string().nonempty({ message: "Place of occurrence is required" }),
  mod_operandi: z.string().nonempty({ message: "Modus operandi is required" }),
  property_list: z.string().optional(),
  value_stolen: z.string().optional(),
  value_recorded: z.string().optional(),
  exhibit_book_ref: z.string().optional(),
  investigation_officer: z.string().optional(),
});

// Default values for the form
const CaseFormDefaultValues: CaseFormData = {
  uz_cr_ref: '',
  uz_rrb_ref: '',
  police_ref: '',
  date_received: '',
  time_received: '',
  complainant_name: '',
  complainant_dept: '',
  complainant_gender: '',
  complainant_address: '',
  complainant_contact: '',
  accused_name: '',
  accused_dept: '',
  accused_gender: '',
  accused_address: '',
  accused_contact: '',
  offence: '',
  date_occurance: '',
  place_of_occurance: '',
  mod_operandi: '',
  property_list: '',
  value_stolen: '',
  value_recorded: '',
  exhibit_book_ref: '',
  investigation_officer: '',
};

const Case = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CaseFormData>({
    resolver: zodResolver(CaseFormValidation),
    defaultValues: CaseFormDefaultValues,
  });

  const onSubmit = (values: CaseFormData) => {
    setIsLoading(true);
    console.log('Form Submitted:', values);
    setIsLoading(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h1" className="header">
          Case Information Form
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h2" className="sub-header">
                Case Details
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('uz_cr_ref')}
                fullWidth
                label="UZ CR Ref"
                variant="outlined"
                error={!!form.formState.errors.uz_cr_ref}
                helperText={form.formState.errors.uz_cr_ref?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('uz_rrb_ref')}
                fullWidth
                label="UZ RRB Ref"
                variant="outlined"
                error={!!form.formState.errors.uz_rrb_ref}
                helperText={form.formState.errors.uz_rrb_ref?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('police_ref')}
                fullWidth
                label="Police Station Ref"
                variant="outlined"
                error={!!form.formState.errors.police_ref}
                helperText={form.formState.errors.police_ref?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('date_received')}
                fullWidth
                label="Date Received"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!form.formState.errors.date_received}
                helperText={form.formState.errors.date_received?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('time_received')}
                fullWidth
                label="Time Received"
                type="time"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!form.formState.errors.time_received}
                helperText={form.formState.errors.time_received?.message}
              />
            </Grid>

            {/* Complainant Information */}
            <Grid item xs={12}>
              <Typography variant="h2" className="sub-header">
                Complainant Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('complainant_name')}
                fullWidth
                label="Name"
                variant="outlined"
                error={!!form.formState.errors.complainant_name}
                helperText={form.formState.errors.complainant_name?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('complainant_dept')}
                fullWidth
                label="Department/Faculty"
                variant="outlined"
                error={!!form.formState.errors.complainant_dept}
                helperText={form.formState.errors.complainant_dept?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('complainant_gender')}
                fullWidth
                label="Gender"
                variant="outlined"
                error={!!form.formState.errors.complainant_gender}
                helperText={form.formState.errors.complainant_gender?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('complainant_address')}
                fullWidth
                label="Address"
                variant="outlined"
                error={!!form.formState.errors.complainant_address}
                helperText={form.formState.errors.complainant_address?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('complainant_contact')}
                fullWidth
                label="Contact (Tel/Mobile)"
                variant="outlined"
                error={!!form.formState.errors.complainant_contact}
                helperText={form.formState.errors.complainant_contact?.message}
              />
            </Grid>

            {/* Accused Information */}
            <Grid item xs={12}>
              <Typography variant="h2" className="sub-header">
                Accused Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('accused_name')}
                fullWidth
                label="Name"
                variant="outlined"
                error={!!form.formState.errors.accused_name}
                helperText={form.formState.errors.accused_name?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('accused_dept')}
                fullWidth
                label="Department/Faculty"
                variant="outlined"
                error={!!form.formState.errors.accused_dept}
                helperText={form.formState.errors.accused_dept?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('accused_gender')}
                fullWidth
                label="Gender"
                variant="outlined"
                error={!!form.formState.errors.accused_gender}
                helperText={form.formState.errors.accused_gender?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('accused_address')}
                fullWidth
                label="Address"
                variant="outlined"
                error={!!form.formState.errors.accused_address}
                helperText={form.formState.errors.accused_address?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('accused_contact')}
                fullWidth
                label="Contact (Tel/Mobile)"
                variant="outlined"
                error={!!form.formState.errors.accused_contact}
                helperText={form.formState.errors.accused_contact?.message}
              />
            </Grid>

            {/* Case Information */}
            <Grid item xs={12}>
              <Typography variant="h2" className="sub-header">
                Case Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('offence')}
                fullWidth
                label="Offence"
                variant="outlined"
                error={!!form.formState.errors.offence}
                helperText={form.formState.errors.offence?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('date_occurance')}
                fullWidth
                label="Date of Occurrence"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!form.formState.errors.date_occurance}
                helperText={form.formState.errors.date_occurance?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('place_of_occurance')}
                fullWidth
                label="Place of Occurrence"
                variant="outlined"
                error={!!form.formState.errors.place_of_occurance}
                helperText={form.formState.errors.place_of_occurance?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('mod_operandi')}
                fullWidth
                label="Modus Operandi"
                variant="outlined"
                error={!!form.formState.errors.mod_operandi}
                helperText={form.formState.errors.mod_operandi?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...form.register('property_list')}
                fullWidth
                label="Type of Property | Item"
                variant="outlined"
                error={!!form.formState.errors.property_list}
                helperText={form.formState.errors.property_list?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('value_stolen')}
                fullWidth
                label="Value of Property Stolen"
                variant="outlined"
                error={!!form.formState.errors.value_stolen}
                helperText={form.formState.errors.value_stolen?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('value_recorded')}
                fullWidth
                label="Value Recorded"
                variant="outlined"
                error={!!form.formState.errors.value_recorded}
                helperText={form.formState.errors.value_recorded?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('exhibit_book_ref')}
                fullWidth
                label="Exhibit Book Reference"
                variant="outlined"
                error={!!form.formState.errors.exhibit_book_ref}
                helperText={form.formState.errors.exhibit_book_ref?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('investigation_officer')}
                fullWidth
                label="Investigation Officer"
                variant="outlined"
                error={!!form.formState.errors.investigation_officer}
                helperText={form.formState.errors.investigation_officer?.message}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={isLoading}
                startIcon={isLoading && <CircularProgress size={20} />}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Case;
