import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <FormControl component="fieldset">
      <RadioGroup aria-label="position" name="position" value={0} row>
        <FormControlLabel
          value="Cash"
          control={<Radio color="primary" checked />}
          label="Cash"
          labelPlacement="end"
        />
      </RadioGroup>
    </FormControl>
    </React.Fragment>
  );
}