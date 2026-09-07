import { Screen, type ScreenId } from "@/components/screens/Screens";

/**
 * Dev-only: renders one platform screen at its native pixel size so
 * `tools/pw/screens.mjs` can save it into public/screens and the 3D devices
 * can wear it as a texture. Example: /dev/screens?id=home
 */
export default async function ScreensPage({ searchParams }: PageProps<"/dev/screens">) {
  const { id } = await searchParams;
  const screen = (typeof id === "string" ? id : "home") as ScreenId;
  return (
    <div id="screen" style={{ display: "inline-block" }}>
      <Screen id={screen} />
    </div>
  );
}
