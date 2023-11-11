import { 
  AccountBoxOutlined,
  GroupAddOutlined, 
  HomeOutlined, 
  PlaylistAddCheckOutlined, 
  PlaylistAddOutlined, 
  RequestQuoteOutlined} from '@mui/icons-material';

interface MenuLinkElement {
  label:string;
  href:string;
  icon: JSX.Element
}

export const menuLinksArray:MenuLinkElement[]=[
  {
    label:'Proveedores',
    href:'/providers',
    icon: <GroupAddOutlined />
  },
  
  
]