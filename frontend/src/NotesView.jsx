import NotesCard from "./NotesCard";

function NotesView() {

    //For testing
    const notes = [
        {
            id: 1,
            title: "Daily Plan",
            body: "Wake up early, finish React components, push commits.",
            visibility: "public",
        },
        {
            id: 2,
            title: "Private thoughts",
            body: "Need to fix auto-resize bug and stop overengineering.",
            visibility: "private",
        },
        {
            id: 3,
            title: "Ideas",
            body: "• Life tracker\n• Habit streaks\n• Calendar sync\n• Offline mode",
            visibility: "private",
        },
        {
            id: 4,
            title: "Meeting Notes",
            body: "Discuss API auth, role-based access, and pagination.",
            visibility: "public",
        },
        {
            id: 5,
            title: "",
            body: "Note without a title (edge case test).",
            visibility: "private",
        },
        {
            id: 6,
            title: "Short",
            body: "Ok",
            visibility: "public",
        },
        {
            id: 7,
            title: "Long body stress test",
            body:
                "This is a very long note body meant to test how the UI behaves when content overflows. ".repeat(
                    6
                ),
            visibility: "private",
        },
        {
            id: 8,
            title: "Draft",
            body: "",
            visibility: "private",
        },
        {
            id: 9,
            title: "Public announcement",
            body: "This note should be visible to everyone.",
            visibility: "public",
        },
        {
            id: 10,
            title: "Code snippet",
            body: "useEffect(() => {\n  console.log('Hello world');\n}, []);",
            visibility: "private",
        },
    ];

    return (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:5 2xl:columns-6 gap-2 bg-neutral-900">
            {notes.map(note => (
                <div key={note.id} className="break-inside-avoid mb-2">
                    <NotesCard note={note} />
                </div>
            ))}
        </div>

    )
}

export default NotesView