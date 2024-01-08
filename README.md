# Enzo
Server side app framework running on bun with HTMX

### Tech Stack
- Hono for routing
- Preact as a JSX templating engine
- HTMX for frontend interactivity
- Tailwind for styling
- Kysely for Migrations and data layer
- Running on Bun

### How to use
Install deps:

```bash
bun install
```

To run:

```bash
bun dev
```


## Framework Documentation

```ts
app.post("/dashboard/expense", async (c) => {
  const result = await validateForm(
    c,
    z.object({
      name: z.string(),
      amount: z.string(),
    })
  );

  if (result.success) {
    const { name, amount } = result.data;

    await createRecord({
      name,
      amount: Number(amount),
      type: "expense",
    });
  }

  return getDashboard(c);
});
```

```tsx
export async function getDashboard(c: Context) {
  const expenses = transformRecords(await getRecordsByType("expense"));
  const income = transformRecords(await getRecordsByType("income"));
  const currentBalance = await getCurrentBalance();

  return render(
    c,
    <Dashboard
      currentBalance={currentBalance}
      income={income}
      expenses={expenses}
    />
  );
}
```


```tsx
type Props = {
  alertMessage?: AlertMessage;
  income: TransformedRecord[];
  expenses: TransformedRecord[];
  currentBalance: number;
};

export function Dashboard(props: Props) {
  return (
    <Layout id="dashboard-root">
      <div class="flex items-center">
        <CoreHeading size="2xl">Dashboard</CoreHeading>
      </div>

      <div class="grid grid-cols-4 gap-4 mx-4">
        <div>
          <ExpensesTable expenses={props.expenses} />
        </div>

        <div>
          <IncomeTable income={props.income} />
        </div>

        <div>
          <AccountBalance currentBalance={props.currentBalance} />
          <Stats
            currentBalance={props.currentBalance}
            income={props.income}
            expenses={props.expenses}
          />
        </div>
      </div>
    </Layout>
  );
}

```

### Cavets

You must fully write out tailwind classes in order for Tailwind to pick them up on scan
```ts
// this works
export function Example() {
  const colorMap = {
    info: "bg-blue-600",
  };

  const color = colorMap["info"];

  return <div class={`${color}`}></div>
}

// this will fail to have classes generated for it
const color = 'blue';
return <div class={`bg-${color}-500`}> 
```