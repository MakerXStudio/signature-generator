import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Signature, { type SignatureProps } from '../Signature/Signature';
import RepliesAndForwards, {
  type RepliesAndForwardsProps,
} from '../RepliesAndForwards/RepliesAndForwards';
import type { SignatureButtons } from './createSignatureButtons';

export interface BrandSignatureContainerProps extends SignatureButtons {
  signatureProps: SignatureProps & RepliesAndForwardsProps;
}

export const BrandSignatureContainer = ({
  signatureProps,
  CopySignatureText,
  CopySignatureHtml,
  CopyRepliesAndForwardsText,
  CopyRepliesAndForwardsHtml,
}: BrandSignatureContainerProps) => (
  <Box>
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1}
      sx={{
        mt: 2,
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h6">Standard Signature</Typography>
      <Stack direction="row" spacing={1}>
        {CopySignatureText}
        {CopySignatureHtml}
      </Stack>
    </Stack>
    <Signature {...signatureProps} />
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1}
      sx={{
        mt: 4,
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h6">Replies and Forwards Signature</Typography>
      <Stack direction="row" spacing={1}>
        {CopyRepliesAndForwardsText}
        {CopyRepliesAndForwardsHtml}
      </Stack>
    </Stack>
    <RepliesAndForwards {...signatureProps} />
  </Box>
);
