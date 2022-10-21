import { FC } from 'react';

import { P, SizedBox } from '../atoms';

type NoteBoxProps = {
  notes: string[];
};
export const NoteBox: FC<NoteBoxProps> = (props) => {
  return (
    <SizedBox width="s400" className="flex flex-col justify-start">
      <SizedBox
        width="s60"
        className="flex items-center justify-center rounded-lg bg-secondary-500"
      >
        <P center small className="!text-white">
          Nota
        </P>
      </SizedBox>
      <div className="m-5 !mb-2 flex w-full flex-col justify-center rounded-sm border border-gray-400 p-3">
        {props.notes.map((note, index) => {
          return (
            <P center secondary small key={index}>
              {note}
            </P>
          );
        })}
      </div>
    </SizedBox>
  );
};
