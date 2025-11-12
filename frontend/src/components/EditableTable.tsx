import { Control, Controller, useFieldArray } from "react-hook-form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Trash2 } from "lucide-react";

interface RowType {
  numberContent?: number | string;
  durationSeconds?: string;
  // se tiver mais campos, adicione aqui
}

interface FormValues {
  rows?: RowType[];
  // outros campos do form principal se houver (discipline, lessonId...)
}

interface ErrorsType {
  rows?: Array<{
    numberContent?: { message: string };
    durationSeconds?: { message: string };
  }>;
}

type EditableTableProps = {
  control: Control<FormValues>;
  errors: ErrorsType;
};

export function EditableTable({ control, errors }: EditableTableProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  return (
    <div className="flex flex-col gap-2">
      <Table className="w-full border border-gray-300">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="border p-2">Número</TableHead>
            <TableHead className="border p-2">Duração</TableHead>
            <TableHead className="border p-2"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell className="border p-1">
                <Controller
                  control={control}
                  name={`rows.${index}.numberContent` as const}
                  render={({ field }) => (
                    <Input type="number" placeholder="0" {...field} />
                  )}
                />
                {errors.rows && errors.rows[index]?.numberContent && (
                  <p className="text-xs text-red-500">
                    {errors.rows[index]!.numberContent!.message}
                  </p>
                )}
              </TableCell>
              <TableCell className="border p-1">
                <Controller
                  control={control}
                  name={`rows.${index}.durationSeconds` as const}
                  render={({ field }) => (
                    <Input placeholder="00:00:00" {...field} />
                  )}
                />
                {errors.rows && errors.rows[index]?.durationSeconds && (
                  <p className="text-xs text-red-500">
                    {errors.rows[index]!.durationSeconds!.message}
                  </p>
                )}
              </TableCell>
              <TableCell className="border p-1 text-center">
                <Button type="button" variant="destructive" onClick={() => remove(index)}>
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        type="button"
        onClick={() => append({ numberContent: 0, durationSeconds: "" })}
      >
        + Adicionar linha
      </Button>
    </div>
  );
}