import type { ThemeConfig } from 'antd'

/**
 * Ant Design theme configuration
 * Defines the visual styling and behavior of Ant Design components
 */
const config: ThemeConfig = {
  token: {
    // Typography
    fontFamily: "Open Sans, 'san-serif'",
    
    // Primary color for the application
    colorPrimary: '#01D167',
  },
  components: {
    // Menu component styling
    Menu: {
      itemColor: '#FFF',
      itemHoverColor: '#01D167',
      itemHoverBg: 'transparent',
      itemActiveBg: 'transparent',
      itemSelectedBg: 'transparent',
    },
    
    // Button component styling
    Button: {
      colorPrimary: '#325BAF',
      borderRadius: 4,
    },
    
    // Tabs component styling
    Tabs: {
      inkBarColor: '#23CEFD',
      itemColor: '#22222230',
      itemSelectedColor: '#222222',
    },
    
    // Collapse component styling
    Collapse: {
      headerBg: '#F5F9FF',
      headerPadding: '24px',
      contentPadding: '24px',
    },
  },
}

export { config }