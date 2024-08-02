import SkeletonElement from "./SkeletonElement"


export const SkeletonForAppBar = () => {
    return (
        <div className="grid h-20 rounded-sm bg-slate-50 pb-5">
        <SkeletonElement width="100%" height="100%" />
      </div>
    )
}