# Services Management Application

A modern services management application for Hosting and VPS services with an optimized user interface and user experience.

## 🚀 Features

- ✅ Complete management of Hosting and VPS services
- ✅ Dynamic forms with advanced validation
- ✅ Data persistence in localStorage
- ✅ Modern UI/UX with Tailwind CSS
- ✅ Loading states and Skeleton screens
- ✅ Modal confirmation for delete operations
- ✅ Type-safe with TypeScript
- ✅ Context API-based architecture

## 📋 Technical Requirements

- **Node.js**: >= 18.x
- **npm**: >= 9.x (or yarn/pnpm)

## 🛠️ Technologies

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 Installation & Setup

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── pages/             # Page-specific components
│   └── shared/            # Reusable UI components
├── contexts/              # React Context providers
├── hooks/                 # Custom React hooks
├── schemas/               # Zod validation schemas
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── constants/             # Application constants
```

## 🎯 Key Features

- **Create Service**: Add new service with dynamic validation
- **Edit Service**: Update existing service information
- **Delete Service**: Remove service with user confirmation
- **Persist Data**: Automatic saving to localStorage
- **Loading States**: Display loading status with Skeleton screens

## 🔧 Scripts

- `npm run dev` - Run development server
- `npm run build` - Build for production
- `npm run start` - Run production build
- `npm run lint` - Run ESLint

## 📝 Notes

- Data is stored in `localStorage`
- Form validation changes based on service type (Hosting/VPS)
- Project uses SSR-safe patterns for localStorage
