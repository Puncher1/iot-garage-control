interface Props {
  components: Array<(unknown: any) => React.ReactElement<any, any>>
  children: React.ReactElement
}

export default function Composer(props: Props) {
  const { components = [], children } = props

  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>
      }, children)}
    </>
  )
}
