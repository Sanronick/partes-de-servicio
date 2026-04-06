const Info = ({ label, value }) => (
  <div>
    <p className="text-white/40 text-xs">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

const Seccion = ({ titulo, children }) => (
  <div>
    <p className="text-[#FFCC27] text-xs font-bold uppercase mb-2">
      {titulo}
    </p>
    <div className="text-sm text-white/80 space-y-1">{children}</div>
  </div>
);

const Badge = ({ text }) => (
  <span className="inline-block bg-[#FFCC27]/20 text-[#FFCC27] px-2 py-0.5 rounded-full text-xs font-semibold mr-1">
    {text}
  </span>
);

export {
    Info,
    Seccion,
    Badge
}