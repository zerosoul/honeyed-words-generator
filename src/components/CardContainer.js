import React from 'react';
import Card from './Card';
import RefreshButton from './RefreshButton';
import SaveButton from './SaveButton';
export default function CardContainer({ visible = false, handleUpdate }) {
  return (
    <>
      <Card visible={visible} />
      <RefreshButton visible={visible} handleUpdate={handleUpdate} />
      <SaveButton visible={visible} />
    </>
  );
}
