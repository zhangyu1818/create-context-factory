# Create Context Factory

`createContextFactory` is a React Context utility that is TypeScript-friendly. No need to declare Context types separately or write Providers - it helps you manage and share state more elegantly.

## Features

- 🚀 Type-safe: Full TypeScript support
- 🎯 Selective subscription: Only subscribe to the states you need, avoid code clutter
- 🔄 Auto-merging: Automatically handles state combinations from multiple hooks
- 📦 Zero dependencies: Only depends on React
- 🎨 Clean and elegant: Uses factory pattern, say goodbye to boilerplate Context code

## Installation

```shell
npx jsr add @reactils/create-context-factory
```

```shell
pnpm dlx jsr add @reactils/create-context-factory
```

## Usage

```tsx
import { createContextFactory } from '@reactils/createContextFactory';
import { useState } from 'react';
// Define your hooks
const useModalOpen = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Logic code...
  return [isOpen, setIsOpen] as const;
};
// Create shared Context
const [Provider, useSelector] = createContextFactory(() => ({
  pending: useIsPending(),
  showModal: useState(false), // Use useState directly
}));
// Use in components
function App() {
  return (
    <Provider>
      <ComponentA />
      <ComponentB />
    </Provider>
  );
}
// Component A only subscribes to pending state
function ComponentA() {
  const [isPending, setPending] = useSelector(state => state.pending);
  // ...
}
// Component B only subscribes to modal state
function ComponentB() {
  const [isOpen, setIsOpen] = useSelector(state => state.showModal);
  // ...
}
```

> [!IMPORTANT]
> Please note that this tool currently cannot prevent Context re-renders.

## License

MIT
