import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/myCookBook")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>My Cookbook !</h3>
    </div>
  );
}
