# SPECS: GeigerCounter Component

## 1. Goal
Create a new React component file at `frontend/src/components/GeigerCounter.jsx`.

## 2. Dependencies
- Must import `useRef` and `useState` from `react`.
- Must import `useGLTF` and `useDrag` from `@react-three/drei`.
- Must import `useSceneStore` from `../store.js`.

## 3. Functionality
The component `GeigerCounter` must:
1.  **Load the Model:** Use `useGLTF` to load the 3D model from `/scene.gltf`.
2.  **Use Store:** Get `geigerPosition` and `setGeigerPosition` from the `useSceneStore`.
3.  **Manage Drag State:** Use `useState` to track a "isDragging" boolean, which will be used to temporarily disable `OrbitControls`.
4.  **Implement Dragging:**
    - Use the `useDrag` hook from `@react-three/drei`.
    - When dragging, it should update the component's position.
    - The drag must be constrained to the **XZ plane** (so it slides on the "floor"). The `y` position should not change.
    - On the `onDragStart` event, set `isDragging(true)`.
    - On the `onDragEnd` event, set `isDragging(false)`.
    - On every `onDrag` event, update the `geigerPosition` in the `zustand` store.
5.  **Enable/Disable Controls:** While dragging (`isDragging(true)`), the global `OrbitControls` must be disabled so the camera doesn't move. You can get the controls via `useThree((state) => state.controls)`.

## 4. Component Structure
- The component should return a `<group>` that contains the loaded model's `scene`.
- The `<group>` should have its `position` set to the `geigerPosition` from the store.
- Apply the `...bind()` props from `useDrag` to the `<group>`.
- Add `castShadow` to all meshes in the loaded scene.