import PropTypes from 'prop-types';
// mui imports
import { ListSubheader, styled } from '@mui/material';

const NavGroup = ({ item, isCollapsed = false }) => {
  const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky {...props} />)(
    ({ theme }) => ({
      ...theme.typography.overline,
      fontWeight: '700',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(0),
      color: theme.palette.text.primary,
      lineHeight: '26px',
      padding: isCollapsed ? '3px 0' : '3px 12px',
      textAlign: isCollapsed ? 'center' : 'left',
      fontSize: isCollapsed ? '0.65rem' : 'inherit',
    }),
  );
  
  if (isCollapsed) {
    return null; // Hide subheaders when collapsed
  }
  
  return (
    <ListSubheaderStyle>{item.subheader}</ListSubheaderStyle>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
  isCollapsed: PropTypes.bool,
};

export default NavGroup;
