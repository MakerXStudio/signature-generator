import { FormProvider, useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import SignatureContainer from '../SignatureContainer/SignatureContainer';
import { placeholders } from '../constants';
import { defaultProfile, type Profile } from '../types';

interface FieldDef {
  name: keyof Profile;
  label: string;
  required?: boolean;
  type?: 'text' | 'email' | 'tel';
}

const fields: FieldDef[] = [
  { name: 'name', label: 'Your Name', required: true },
  { name: 'pronoun', label: 'Your Pronouns' },
  { name: 'title', label: 'Job Title' },
  { name: 'qualifications', label: 'Qualifications' },
  { name: 'mobile', label: 'Mobile', type: 'tel', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'twitter', label: 'Twitter' },
];

const Form = () => {
  const methods = useForm<Profile>({
    defaultValues: defaultProfile,
    mode: 'onSubmit',
  });

  return (
    <FormProvider {...methods}>
      <Box component="div" sx={{ width: '100%' }}>
        <Typography variant="h5" component="h3" sx={{ mt: 3, mb: 2 }}>
          Your details
        </Typography>
        <Box component="form" noValidate>
          <Stack spacing={2}>
            {fields.map((f) => (
              <Stack
                key={f.name}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ alignItems: { sm: 'center' } }}
              >
                <Box sx={{ minWidth: 160 }}>
                  <Typography component="label" htmlFor={`input-${f.name}`}>
                    {f.label}
                    {f.required ? (
                      <span title="Required" style={{ color: 'red' }}>
                        &nbsp;*
                      </span>
                    ) : null}
                  </Typography>
                </Box>
                <Controller
                  name={f.name}
                  control={methods.control}
                  rules={f.required ? { required: true } : undefined}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      value={(field.value as string) ?? ''}
                      id={`input-${f.name}`}
                      type={f.type ?? 'text'}
                      required={f.required}
                      placeholder={placeholders[f.name as keyof typeof placeholders]}
                      error={!!fieldState.error}
                      size="small"
                      sx={{ maxWidth: 400, width: '100%' }}
                    />
                  )}
                />
              </Stack>
            ))}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ alignItems: { sm: 'center' } }}
            >
              <Box sx={{ minWidth: 160 }}>
                <Typography component="label" htmlFor="input-addGPTW">
                  Add GPTW
                </Typography>
              </Box>
              <Controller
                name="addGPTW"
                control={methods.control}
                render={({ field }) => (
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox
                        id="input-addGPTW"
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                  />
                )}
              />
            </Stack>
          </Stack>
          <Divider sx={{ my: 3 }} />
          <SignatureContainer />
        </Box>
      </Box>
    </FormProvider>
  );
};

export default Form;
