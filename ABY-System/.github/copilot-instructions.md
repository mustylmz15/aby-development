# Copilot Instructions

## Core Commands

### Development
- `npm run dev` - Start development server with host binding
- `npm run build` - TypeScript compilation + Vite build
- `npm run preview` - Preview production build

### Code Quality
- **Formatter**: Prettier configured (`.prettierrc`)
  - Semi-colons: enabled
  - Single quotes: enabled  
  - Print width: 160
  - Vue indent script/style: enabled
- **Linting**: No ESLint config detected
- **Type checking**: `tsc` via build command

## Architecture

### Tech Stack
- **Framework**: Vue 3 + TypeScript + Vite
- **State Management**: Pinia store (`src/stores/index.ts`)
- **Routing**: Vue Router with authentication guards
- **Styling**: TailwindCSS + custom theme system
- **Internationalization**: Vue I18n (16 languages supported)
- **HTTP Client**: Axios with interceptors
- **Notifications**: SweetAlert2
- **UI Components**: Custom component library in `src/components/`

### Core Modules
- **Warehouse Management**: `src/views/warehouse/` - Inventory, stock movements, transfers
- **Fault Management**: `src/views/fault-management/` - Issue tracking, repair workflows  
- **Repair Center**: `src/views/repair-center/` - Repair operations, part management
- **Inventory**: `src/views/inventory/` - Stock management, center stock operations
- **Projects**: `src/views/projects/` - Project management and product assignments
- **Users**: `src/views/users/` - User management, roles, permissions
- **Approval**: `src/views/approval/` - Approval workflows

### Data Management
- **Mock Data System**: Centralized in `src/views/mock/composables/`
  - Storage key: `vristo_mock_data_v1`
  - Composables: `useProducts`, `useWarehouses`, `useInventory`, `useFaults`, etc.
  - Migration system from legacy localStorage keys
- **API Layer**: RESTful APIs with authentication tokens
- **State**: Reactive Composition API patterns

### External APIs
- Base URL: `VITE_API_BASE_URL` environment variable
- Authentication: Bearer tokens in localStorage
- Endpoints: `/api/v1/products`, `/api/v1/warehouses`, `/api/v1/repairs`, etc.

## Repo-specific Style Rules

### File Organization
- **Views**: Feature-based folders in `src/views/`
- **Components**: Reusable UI components in `src/components/`
- **Layouts**: App and auth layouts in `src/layouts/`
- **Assets**: Static files in `src/assets/` and `public/assets/`
- **Types**: TypeScript interfaces in component directories or `src/types/`

### Vue Component Patterns
- Use `<script setup>` syntax with TypeScript
- Composition API over Options API
- Props interface definitions with `defineProps<T>()`
- Emit definitions with `defineEmits<T>()`
- Reactive refs and computed properties

### Naming Conventions
- **Files**: kebab-case for Vue components and assets
- **Components**: PascalCase for component names
- **Variables**: camelCase for reactive data
- **Constants**: UPPER_SNAKE_CASE
- **API endpoints**: RESTful conventions

### Import Patterns
- Path alias `@/` points to `src/`
- Group imports: Vue core, external libs, internal modules
- Use `import type` for TypeScript-only imports

### Error Handling
- Try-catch blocks for async operations
- SweetAlert2 for user-friendly error messages
- Console logging for development debugging
- API interceptors for global error handling

### State Management
- Pinia stores for global state
- Composables for feature-specific logic
- LocalStorage for persistence
- Reactive patterns with `ref()` and `computed()`

### Styling
- TailwindCSS utility classes preferred
- Custom CSS in scoped `<style>` blocks
- Dark mode support via `dark:` prefix
- Theme colors defined in `tailwind.config.cjs`

## Agent Rules

### Code Quality
- Follow TypeScript strict mode settings
- Use meaningful variable and function names in Turkish for domain-specific terms
- Implement proper loading states and error boundaries
- Maintain component single responsibility principle

### Performance
- Lazy load route components with `import()`
- Use `v-show` vs `v-if` appropriately
- Implement proper cleanup in `onUnmounted`
- Optimize bundle size with tree shaking

### Security
- Validate user inputs
- Sanitize data before API calls
- Use proper authentication patterns
- Handle sensitive data appropriately

### Accessibility
- Use semantic HTML elements
- Implement proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios

### Testing
- Component testing capabilities exist but no test runner configured
- Mock data system for development testing
- Browser console utilities for runtime testing

## Project Context

This is a warehouse/inventory management system with features for:
- Product and warehouse management
- Fault/repair tracking workflows  
- Inventory movements and transfers
- User management and approvals
- Multi-language support (Turkish primary)
- Dark/light theme switching
- Mobile-responsive design

The system has undergone significant refactoring to centralize mock data management and eliminate code duplication. Focus on maintaining the established patterns and architectural decisions.
