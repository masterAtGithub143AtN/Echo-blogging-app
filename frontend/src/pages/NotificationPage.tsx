


export const NotificationPage = () => {
    return (
        <div>
            <div className="bg-blue-500 p-3">
                <h1 className="text-white text-center">Notification</h1>
            </div>
            <div className="p-3">
                <div className="flex justify-center">
                    <div className="w-1/2">
                        <div className="pt-3">
                            <label className="p-2 font-bold">Title</label>
                        </div>
                        <div className="pt-1">
                            <input required className="border border-gray-500 p-2 w-full rounded-md" type="text" placeholder="Title" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-1/2">
                        <div className="pt-3">
                            <label className="p-2 font-bold">Content</label>
                        </div>
                        <div className="pt-1">
                            <textarea required className="border border-gray-500 p-2 w-full rounded-md" placeholder="Content" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center pt-3">
                    <button className="bg-blue-500 text-white p-2 rounded-md">Send</button>
                </div>
            </div>
        </div>
    )
}