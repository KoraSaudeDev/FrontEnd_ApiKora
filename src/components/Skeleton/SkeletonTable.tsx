import { Skeleton } from "./Skeleton";

export function SkeletonTable() {
  return (
    <div className="w-full overflow-auto border border-slate-200 rounded-md mt-8">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 text-start pl-4"></th>
            <th className="py-2 text-start">
              <Skeleton className="w-[150px] h-6 " />
            </th>
            <th className="py-2 text-start">
              <Skeleton className="w-[150px] h-6 " />
            </th>
            <th className="py-2 text-start">
              <Skeleton className="w-[150px] h-6 " />
            </th>
            <th className="py-2 text-end pr-4"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="border-b">
            <td className="py-2 text-start pl-4">
              <Skeleton className="size-4 rounded-full" />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td></td>
          </tr>
          <tr className="border-b">
            <td className="py-2 text-start pl-4">
              <Skeleton className="size-4 rounded-full" />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td></td>
          </tr>
          <tr className="border-b">
            <td className="py-2 text-start pl-4">
              <Skeleton className="size-4 rounded-full" />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td></td>
          </tr>
          <tr className="border-b">
            <td className="py-2 text-start pl-4">
              <Skeleton className="size-4 rounded-full" />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td></td>
          </tr>
          <tr className="border-b">
            <td className="py-2 text-start pl-4">
              <Skeleton className="size-4 rounded-full" />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td></td>
          </tr>
          <tr className="border-b">
            <td className="py-2 text-start pl-4">
              <Skeleton className="size-4 rounded-full" />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td>
              <Skeleton className="w-[150px] h-6 " />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
