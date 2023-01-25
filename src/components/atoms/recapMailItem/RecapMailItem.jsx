import { Span, Item, Image, Box} from 'react-html-email'

export const RecapMailItem = ({item}) => {

  return (

    <Box cellSpacing={10} width="100%" style={{ border: '3px solid black', backgroundColor: "#F6F3F0", margin: 10}}>
      <Item align='center'>
        <Image alt="image_produit" src={item?.image?.url} width={100} height={120} />
        <Item align='center'>
          <Span color="black" fontWeight="Bold">{item?.name}</Span>
        </Item>
        <Item align='center'>
          <Span color="black">{item.quantity} {item.quantity>1?'articles':'article'} | {item?.selected_options[0]?.option_name} | {item?.price?.formatted}€ l'unité</Span>
        </Item>
      </Item>
    </Box>
  )
}


