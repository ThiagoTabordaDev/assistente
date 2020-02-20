import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button: { margin: theme.spacing(1) },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    IconRight: {
        padding: 2,
        display: 'contents',
        justifyContent: 'flex-end',
        backgroundColor: 'buttonface',
    },
    table: {
        minWidth: 300,
        marginBotton: '0.75rem',
        whiteSpace: 'nowrap',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        padding: theme.spacing(2, 4, 3),
    },
    icon: {
        padding: 2,
    },
    card: {
        marginBottom: '10px',
    },
    inputRight: {
        textAlignLast: 'right',
        minWidth: '110px',
        paddingLeft: '3px',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonProgress: {
        color: blueGrey[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));
