# Styles Documentation

## Global Styles (main.scss)
- Modern CSS reset
- Responsive base font size (16px)
- System font stack with Inter as primary
- Enhanced text rendering optimizations
- Dark theme base (black background)

### Usage
Import in components using:
```scss
@use '@/assets/styles/main';
```

### Maintenance
- Keep global styles minimal
- Document significant changes
- Test across different browsers
- Verify mobile responsiveness

## Variables (variables.scss)
Core design tokens:

### Colors
- `$bg-main`: #000000 (Main background)
- `$text-main`: #ffffff (Primary text)

### Usage
```scss
@use '@/assets/styles/variables' as *;
```