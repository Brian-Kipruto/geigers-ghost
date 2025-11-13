# SPECS: LeadBrick Component

## 1. Goal
Create a new React component file at `frontend/src/components/LeadBrick.jsx`.

## 2. Functionality
This component must be a copy of `GeigerCounter.jsx` but adapted for the "lead brick".

1.  **Dependencies:** Must import `useRef`, `useEffect`, `useState`, `useGLTF`, `DragControls`, and `useSceneStore`.
2.  **Model:** Must load the model from `/brick.gltf`.
3.  **State:**
    - It must get `shieldPosition` and `setShieldPosition` from the `useSceneStore`.
    - It must use the `controlsRef` prop to disable `OrbitControls` while dragging.
4.  **Drag Logic:**
    - It must use `<DragControls />`.
    - `onDragStart` must set `isDragging(true)`.
    - `onDragEnd` must set `isDragging(false)`.
    - `onDrag` must update the `shieldPosition` in the store and constrain the model to the XZ plane.
5.  **Export:** Must be a `default` export.