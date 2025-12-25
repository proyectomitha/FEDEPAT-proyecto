import { useDurationInput } from "react-duration-input";
import type { Member } from "../types";

type RowProps = {
  member: Member;
  value: { score: number; time: number };
  setValues: any;
  updateOnBlur: (id: string, score: number, time: number) => any;
};

export const MemberRow: React.FC<RowProps> = ({
  member,
  value,
  setValues,
  updateOnBlur,
}) => {
  const durationInputProps = useDurationInput({
    timeInMilliseconds: value.time,
    onTimeUpdate: (ms) => {
      setValues((prev: any) => ({
        ...prev,
        [member.id]: {
          ...prev[member.id],
          time: ms,
        },
      }));
    },
  });

  const normalizeDuration = (input: string) => {
    console.log("input: " + input);
    const parts = input.split(/[:.]/);
    console.log("parts: " + parts);

    let h = parts[0] ?? "0";
    let m = parts[1] ?? "0";
    let s = parts[2] ?? "0";
    let ms = parts[3] ?? "0";

    // relleno a la derecha
    h = h.padEnd(2, "0");
    m = m.padEnd(2, "0");
    s = s.padEnd(2, "0");
    ms = ms.padEnd(3, "0");

    return `${h}:${m}:${s}.${ms}`;
  };

  return (
    <tr className="hover:bg-white border-b-3 border-white cursor-default">
      <td className="p-4 trucate">{member.number}</td>
      <td className="p-4 trucate">{member.name}</td>
      <td className="p-4 trucate">{member.lastname}</td>

      {/* SCORE autosave */}
      <td className="p-4 ">
        <input
          type="number"
          className="w-20 p-1 rounded text-cyan-700 bg-white"
          value={value.score}
          onChange={(e) => {
            const score = Number(e.target.value);

            setValues((prev: any) => ({
              ...prev,
              [member.id]: { ...prev[member.id], score },
            }));
          }}
          onBlur={() => {
            console.log(updateOnBlur(member.id, value.score, value.time));
            //setReload();
          }}
        />
      </td>

      {/* TIEMPO — react-duration-input */}
      <td className="p-4 px-8">
        <input
          {...durationInputProps}
          className="w-40 p-1 rounded text-cyan-700 bg-white"
          onBlur={async (e) => {
            console.log("me ejecuto");
            const normalized = normalizeDuration(e.target.value);
            console.log("me ejecuto 2");
            e.target.value = normalized;

            // parseamos a ms desde el string normalizado
            const [h, m, s, ms] = normalized
              .split(/[:.]/)
              .map((x) => Number(x));
            console.log("me ejecuto3");

            const totalMs = h * 3600000 + m * 60000 + s * 1000 + ms;

            // sincronizamos el estado ANTES de guardar
            setValues((prev: any) => ({
              ...prev,
              [member.id]: {
                ...prev[member.id],
                time: totalMs,
              },
            }));

            /*/ notificamos también al hook
            await durationInputProps.onChange?.({
              ...e,
              target: { ...e.target, value: normalized },
            } as any);*/

            // ahora sí — value.time ya está actualizado
            const result = await updateOnBlur(member.id, value.score, totalMs);

            if (result) {
              console.log("result:", result);
              //setReload();
            }
          }}
        />
      </td>
    </tr>
  );
};
