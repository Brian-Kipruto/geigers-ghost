# SPECS: LabScene Component

## 1. Goal
Create a new React component file at `frontend/src/components/LabScene.jsx`.

## 2. Dependencies
- Must import `useEffect` from `react`.
- Must import `useGLTF` from `@react-three/drei`.

## 3. Functionality
The component `LabScene` must:
1.  **Load Model:** Use `useGLTF` to load the 3D model from `/lab_scene.glb`.
2.  **Set Shadows:**
    - Use `useEffect` to traverse the entire loaded `scene`.
    - For every mesh in the scene, it must `castShadow = true` and `receiveShadow = true`. This is critical for the spooky lighting.
3.  **Return:** The component should return a `<primitive object={scene} />`.
4.  **Export:** Must be a `default` export.