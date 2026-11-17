import { education, focusAreas, stack } from "@/data/site";

const cell = "rounded-2xl border border-trace bg-layer p-6";
const cellTitle = "font-display text-lg font-semibold tracking-tight";

export default function Bento() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className={`${cell} md:col-span-2`}>
        <h3 className={cellTitle}>Hardware first, then the model</h3>
        <p className="mt-3 max-w-[62ch] leading-relaxed text-haze">
          I trained as an electronics engineer before I moved into AI, so I start
          from the sensor, the battery and the radio, and work up to the model.
          Most of what I build has to run on a microcontroller with a few hundred
          kilobytes of memory and no internet connection. That constraint decides
          the architecture long before training starts.
        </p>
      </div>

      <div className={cell}>
        <h3 className={cellTitle}>What I work on</h3>
        <ul className="mt-3 space-y-2.5">
          {focusAreas.map((area) => (
            <li key={area} className="flex items-start gap-2.5 text-[15px] text-silk">
              <span
                aria-hidden="true"
                className="mt-[7px] h-2 w-2 shrink-0 rounded-full border border-pad"
              />
              {area}
            </li>
          ))}
        </ul>
      </div>

      <div className={`${cell} overflow-hidden`}>
        <h3 className={cellTitle}>Tools I reach for</h3>
        {/* The list is doubled so the loop has no seam; the copy is hidden from screen readers. */}
        <div className="mt-5 -mx-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="stack-track flex w-max gap-2 px-6">
            {[false, true].map((copy) => (
              <ul key={String(copy)} aria-hidden={copy || undefined} className="flex gap-2">
                {stack.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-lg border border-trace bg-mask/70 px-3 py-1.5 text-sm whitespace-nowrap text-silk"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-haze">
          From Verilog and C on the board up to TensorFlow and PyTorch for training.
        </p>
      </div>

      <div className={`${cell} md:col-span-2`}>
        <h3 className={cellTitle}>Education</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {education.map((item) => (
            <div key={item.degree} className="rounded-xl border border-trace bg-mask/70 p-4">
              <p className="font-medium text-silk">{item.degree}</p>
              <p className="mt-1 text-sm text-haze">
                {item.school}, {item.place}
              </p>
              <p
                className={`mt-3 inline-block rounded-full border px-2.5 py-0.5 text-xs ${
                  item.status === "In progress"
                    ? "border-pad/60 text-pad"
                    : "border-trace text-haze"
                }`}
              >
                {item.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
