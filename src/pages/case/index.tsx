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
import { useNavigate } from 'react-router-dom';
import caseService from '../../api/services/case.service';

import { toast } from 'react-toastify';

export interface CaseCreatePayload {
  data: CaseFormData;
}

interface CaseFormData {
  uz_cr_ref: string;
  uz_rrb_ref: string;
  police_station_ref: string;
  case_date_received: string;
  time_received: string;
  complainant_name: string;
  complainant_regnumber: string;
  complainant_department: string;
  complainant_programme: string;
  complainant_age: string;
  complainant_gender: string;
  complainant_address: string;
  complainant_mobile: string;
  accused_name: string;
  accused_reg_number: string;
  accused_department: string;
  accused_programme: string;
  accused_age: string;
  accused_gender: string;
  accused_address: string;
  accused_mobile: string;
  offense: string;
  offense_date_of_occurance: string;
  place_of_occurance: string;
  modus_operandi: string;
  property_list: string;
  property_value_stolen: string;
  property_value_recorded: string;
  property_exhibit_book_reference: string;
  investigating_officer_name: string;
  investigating_officer_designation: string;
  date: string;

}

// Define validation schema using Zod
const CaseFormValidation = z.object({
  uz_cr_ref: z.string().optional(),
  uz_rrb_ref: z.string().optional(),
  police_station_ref: z.string().optional(),
  case_date_received: z.string().optional(),
  time_received: z.string().optional(),
  complainant_name: z.string().optional(),
  complainant_regnumber: z.string().optional(),
  complainant_department: z.string().optional(),
  complainant_programme: z.string().optional(),
  complainant_age: z.string().optional(),
  complainant_gender: z.string().optional(),
  complainant_address: z.string().optional(),
  complainant_mobile: z.string().optional(),
  accused_name: z.string().optional(),
  accused_reg_number: z.string().optional(),
  accused_department: z.string().optional(),
  accused_programme: z.string().optional(),
  accused_age: z.string().optional(),
  accused_gender: z.string().optional(),
  accused_address: z.string().optional(),
  accused_mobile: z.string().optional(),
  offense: z.string().optional(),
  offense_date_of_occurance: z.string().optional(),
  place_of_occurance: z.string().optional(),
  modus_operandi: z.string().optional(),
  property_list: z.string().optional(),
  property_value_stolen: z.string().optional(),
  property_value_recorded: z.string().optional(),
  property_exhibit_book_reference: z.string().optional(),
  investigating_officer_name: z.string().optional(),
  investigating_officer_designation: z.string().optional(),
  date: z.string().optional(),
});

// Default values for the form
const CaseFormDefaultValues: CaseFormData = {
  uz_cr_ref: '',
  uz_rrb_ref: '',
  police_station_ref: '',
  case_date_received: '',
  time_received: '',
  complainant_name: '',
  complainant_regnumber: '',
  complainant_department: '',
  complainant_programme: '',
  complainant_age: '',
  complainant_gender: '',
  complainant_address: '',
  complainant_mobile: '',
  accused_name: '',
  accused_reg_number: '',
  accused_department: '',
  accused_programme: '',
  accused_age: '',
  accused_gender: '',
  accused_address: '',
  accused_mobile: '',
  offense: '',
  offense_date_of_occurance: '',
  place_of_occurance: '',
  modus_operandi: '',
  property_list: '',
  property_value_stolen: '',
  property_value_recorded: '',
  property_exhibit_book_reference: '',
  investigating_officer_name: '',
  investigating_officer_designation: '',
  date: '',
  
};

const Case = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<CaseFormData>({
    resolver: zodResolver(CaseFormValidation),
    defaultValues: CaseFormDefaultValues,
  });

  const onSubmit = async (values: CaseFormData) => {
    setIsLoading(true);
   
    try {
     
      const payload: CaseCreatePayload = { data: values };

      // Send the payload with the correct structure
      await caseService.create(payload);
  
      toast.success('Record Created Successfully:');
      setIsLoading(false);
      navigate('/dashboard');
    } catch (error) {
      setIsLoading(false);
      console.log("your error: ", error);
      toast.error('Error submitting form:');
    }
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
                {...form.register('police_station_ref')}
                fullWidth
                label="Police Station Ref"
                variant="outlined"
                error={!!form.formState.errors.police_station_ref}
                helperText={form.formState.errors.police_station_ref?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('case_date_received')}
                fullWidth
                label="Date Received"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!form.formState.errors.case_date_received}
                helperText={form.formState.errors.case_date_received?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('time_received')}
                fullWidth
                label="Time Received"
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

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('complainant_name')}
                fullWidth
                label="Full Name"
                variant="outlined"
                error={!!form.formState.errors.complainant_name}
                helperText={form.formState.errors.complainant_name?.message}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('complainant_regnumber')}
                fullWidth
                label="Registration Number"
                variant="outlined"
                error={!!form.formState.errors.complainant_regnumber}
                helperText={form.formState.errors.complainant_regnumber?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('complainant_department')}
                fullWidth
                label="Department/Faculty"
                variant="outlined"
                error={!!form.formState.errors.complainant_department}
                helperText={form.formState.errors.complainant_department?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('complainant_programme')}
                fullWidth
                label="Programme"
                variant="outlined"
                error={!!form.formState.errors.complainant_programme}
                helperText={form.formState.errors.complainant_programme?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('complainant_gender')}
                fullWidth
                label="Gender"
                variant="outlined"
                error={!!form.formState.errors.complainant_gender}
                helperText={form.formState.errors.complainant_gender?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('complainant_address')}
                fullWidth
                label="Address"
                variant="outlined"
                error={!!form.formState.errors.complainant_address}
                helperText={form.formState.errors.complainant_address?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('complainant_age')}
                fullWidth
                label="Age"
                variant="outlined"
                error={!!form.formState.errors.complainant_gender}
                helperText={form.formState.errors.complainant_gender?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('complainant_mobile')}
                fullWidth
                label="Contact (Tel/Mobile)"
                variant="outlined"
                error={!!form.formState.errors.complainant_mobile}
                helperText={form.formState.errors.complainant_mobile?.message}
              />
            </Grid>
           

            {/* Accused Information */}
            <Grid item xs={12}>
              <Typography variant="h2" className="sub-header">
                Accused Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('accused_name')}
                fullWidth
                label="Name"
                variant="outlined"
                error={!!form.formState.errors.accused_name}
                helperText={form.formState.errors.accused_name?.message}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('accused_reg_number')}
                fullWidth
                label="Registration Number"
                variant="outlined"
                error={!!form.formState.errors.accused_reg_number}
                helperText={form.formState.errors.accused_reg_number?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('accused_department')}
                fullWidth
                label="Department/Faculty"
                variant="outlined"
                error={!!form.formState.errors.accused_department}
                helperText={form.formState.errors.accused_department?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('accused_programme')}
                fullWidth
                label="Programme"
                variant="outlined"
                error={!!form.formState.errors.accused_programme}
                helperText={form.formState.errors.accused_programme?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('accused_gender')}
                fullWidth
                label="Gender"
                variant="outlined"
                error={!!form.formState.errors.accused_gender}
                helperText={form.formState.errors.accused_gender?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('accused_address')}
                fullWidth
                label="Address"
                variant="outlined"
                error={!!form.formState.errors.accused_address}
                helperText={form.formState.errors.accused_address?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('accused_age')}
                fullWidth
                label="Age"
                variant="outlined"
                error={!!form.formState.errors.accused_age}
                helperText={form.formState.errors.accused_age?.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...form.register('accused_mobile')}
                fullWidth
                label="Contact (Tel/Mobile)"
                variant="outlined"
                error={!!form.formState.errors.accused_mobile}
                helperText={form.formState.errors.accused_mobile?.message}
              />
            </Grid>

            {/* Case Information */}
            <Grid item xs={12}>
              <Typography variant="h2" className="sub-header">
                Offence | Misconduct
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('offense')}
                fullWidth
                label="Offence"
                variant="outlined"
                error={!!form.formState.errors.offense}
                helperText={form.formState.errors.offense?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('offense_date_of_occurance')}
                fullWidth
                label="Date of Occurrence"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!form.formState.errors.offense_date_of_occurance}
                helperText={form.formState.errors.offense_date_of_occurance?.message}
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
                {...form.register('modus_operandi')}
                fullWidth
                label="Modus Operandi"
                variant="outlined"
                error={!!form.formState.errors.modus_operandi}
                helperText={form.formState.errors.modus_operandi?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h2" className="sub-header">
                Property
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...form.register('property_list')}
                fullWidth
                label="List (Invl S/N)"
                variant="outlined"
                error={!!form.formState.errors.property_list}
                helperText={form.formState.errors.property_list?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('property_value_stolen')}
                fullWidth
                label="Value of Property Stolen | Damaged"
                variant="outlined"
                error={!!form.formState.errors.property_value_stolen}
                helperText={form.formState.errors.property_value_stolen?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('property_value_recorded')}
                fullWidth
                label="Value Recorded"
                variant="outlined"
                error={!!form.formState.errors.property_value_recorded}
                helperText={form.formState.errors.property_value_recorded?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('property_exhibit_book_reference')}
                fullWidth
                label="Exhibit Book Reference"
                variant="outlined"
                error={!!form.formState.errors.property_exhibit_book_reference}
                helperText={form.formState.errors.property_exhibit_book_reference?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h2" className="sub-header">
                Investigating Officer
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('investigating_officer_name')}
                fullWidth
                label="Name"
                variant="outlined"
                error={!!form.formState.errors.investigating_officer_name}
                helperText={form.formState.errors.investigating_officer_name?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('investigating_officer_designation')}
                fullWidth
                label="Designation"
                variant="outlined"
                error={!!form.formState.errors.investigating_officer_designation}
                helperText={form.formState.errors.investigating_officer_designation?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...form.register('date')}
                fullWidth
                label="Date"
                variant="outlined"
                error={!!form.formState.errors.date}
                helperText={form.formState.errors.date?.message}
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
