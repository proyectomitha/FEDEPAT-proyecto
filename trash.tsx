{
  /*
                  <tr key={member.id} className="hover:bg-cyan-500">
                    <td className="p-4 px-8">{member.number}</td>
                    <td className="p-4 px-8">{member.name}</td>
                    <td className="p-4 px-8">{member.lastname}</td>
                    <td className="p-4 px-8">
                      <input
                        type="number"
                        className="w-20 p-1 rounded text-cyan-700 bg-white"
                        value={value.score}
                        onChange={(e) =>
                          setValues((prev) => ({
                            ...prev,
                            [member.id]: {
                              ...prev[member.id],
                              score: Number(e.target.value),
                            },
                          }))
                        }
                      />
                    </td>
                    <td className="p-4 px-8 flex gap-1 items-center">
                      <input
                        type="number"
                        min="0"
                        className="w-14 p-1 rounded text-cyan-700 bg-white"
                        value={h}
                        onChange={(e) => {
                          const newH = Number(e.target.value);
                          setValues((prev) => ({
                            ...prev,
                            [member.id]: {
                              ...prev[member.id],
                              time: hmsToSeconds(newH, m, s),
                            },
                          }));
                        }}
                      />
                      :
                      <input
                        type="number"
                        min="0"
                        max="59"
                        className="w-14 p-1 rounded text-cyan-700 bg-white"
                        value={m}
                        onChange={(e) => {
                          const newM = Number(e.target.value);
                          setValues((prev) => ({
                            ...prev,
                            [member.id]: {
                              ...prev[member.id],
                              time: hmsToSeconds(h, newM, s),
                            },
                          }));
                        }}
                      />
                      :
                      <input
                        type="number"
                        min="0"
                        max="59"
                        className="w-14 p-1 rounded text-cyan-700 bg-white"
                        value={s}
                        onChange={(e) => {
                          const newS = Number(e.target.value);
                          setValues((prev) => ({
                            ...prev,
                            [member.id]: {
                              ...prev[member.id],
                              time: hmsToSeconds(h, m, newS),
                            },
                          }));
                        }}
                      />
                    </td>
                    {can_update ? (
                      <td className="p-4 px-8 w-full text-right">
                        <button
                          className="p-2 bg-green-600 cursor-pointer hover:bg-green-500"
                          onClick={async () => {
                            console.log(member.id);
                            console.log(
                              await setScore(
                                member.id,
                                serie_id, //<-- id_Serie
                                value.score,
                                value.time
                              )
                            );
                            reload();
                          }}
                        >
                          Actualizar
                        </button>
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>*/
}
