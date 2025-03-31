export default function AccountAction({
  className,
  title,
  onSubmit,
  children,
}) {
  return (
    <section className={className}>
      <h3>{title}</h3>
      <form onSubmit={onSubmit}>
        {children}
        <button>→</button>
      </form>
    </section>
  );
}
