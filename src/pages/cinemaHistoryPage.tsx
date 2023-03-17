import styled from "styled-components";

import { COLORS, FONT_SIZES } from "../constants/styles";

export const CinemaHistoryPage = () => {
  return (
    <>
      <Wrapper>
        History of movies started in late 19th century with the era of movie
        pioneers who worked on initial efforts of establishing movie business.
        During this time recording and projecting short single-camera films
        slowly expanded across Europe and United States, giving motivation to
        countless inventors and filmmakers to start expanding this business.
        Innovators like Thomas Edison created numerous devices that enabled
        movie reproduction, but his business decisions (patents) almost
        singlehandedly forced out the movie creators out of New York area and
        into the sunny California where they created Hollywood studios in 2nd
        decade of 20th century. However even before that popularization of film
        in the US and Europe can be mostly contributed to two influential
        companies - American Mutoscope Company that promoted short movies and
        created first cinema in the US (“The Nickelodeon” in Pittsburg) and on
        the other side of the Atlantic, French Lumière Company created over 1000
        short silent films produced on all four corners of the world. It would
        be a great mistake not to also mention one of the greatest visionaries
        of the silent movie era - Georges Méliès (who has in first few years of
        20th century managed to revolutionize the field of cinematic special
        effects), Charles Pathé (owner of the largest film company of that
        time), Robert W. Paul, James Williamson and G.A. Smith.
        <br />
        <br />
        Sound era lasted until late 1920s with the tremendous successes of the
        films of Charlie Chaplin, Ben Huyr, Nosferatu, Battleship Potemkin and
        others. However, revolution in film arrived in 1927 in Warne Bros. film
        “The Jazz Singer” which marked the beginning of the new era – era of
        sound. From that point on, black and white sound films became immensely
        popular, birthing new stars and enabling directors and screenwriters to
        explore advanced techniques of storytelling. As the World War 2 faded
        away in memories, stars like Humphrey Bogart, Audrey Hepburn, Fred
        Astaire and others ushered new age of Hollywood, that promoted fast
        paced comedies, musicals, gangster and even few science fiction films.
        <br />
        <br />
        As total domination of Hollywood over the entire population of US came
        to the end with the advent of the television and the government
        intervention where cinemas were forbidden to be owned by the studios
        themselves, film industry moved to the more serious themes, advances in
        storytelling, and actors whose performances blurred the line between
        protagonists and antagonists.
        <br />
        <br />
        Carried to the 60s and 70s with the star talent of Marlon Brando,
        Gregory Peck , and Frank Sinatra, history of film industry again changed
        with the arrival of fist Blockbuster films (Star Wars). And from that
        moment on, film industry entered into the new age where summer
        blockbusters fight against winter Oscar contenders for attention of
        worldwide public.
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  text-indent: ${FONT_SIZES.lg};
  color: ${COLORS.white};
  text-align: justify;
`;
